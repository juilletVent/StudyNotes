use aes_gcm::{aead::Aead, Aes256Gcm, KeyInit};
use p256::{
    ecdh::{self},
    pkcs8::{EncodePrivateKey, EncodePublicKey},
    SecretKey,
};
use rand_core::{OsRng, RngCore};

fn main() {
    // Alice 私钥生成
    let alice_sk = SecretKey::random(&mut OsRng);
    let alice_pk = alice_sk.public_key();

    // Bob 私钥生成
    let bob_sk = SecretKey::random(&mut OsRng);
    let bob_pk = bob_sk.public_key();

    // ECDH 密钥交换
    let alice_shared_secret =
        ecdh::diffie_hellman(alice_sk.to_nonzero_scalar(), bob_pk.as_affine());
    let bob_shared_secret = ecdh::diffie_hellman(bob_sk.to_nonzero_scalar(), alice_pk.as_affine());

    println!("=================== ECDH 密钥交换 ===================");
    println!(
        "Alice 私钥: \n{}",
        alice_sk
            .to_pkcs8_pem(pkcs8::LineEnding::LF)
            .unwrap()
            .as_str()
    );
    println!(
        "Alice 公钥: \n{}",
        alice_pk.to_public_key_pem(pkcs8::LineEnding::LF).unwrap()
    );

    println!(
        "Bob 私钥: \n{}",
        bob_sk.to_pkcs8_pem(pkcs8::LineEnding::LF).unwrap().as_str()
    );

    println!(
        "Bob 公钥: \n{}",
        bob_pk.to_public_key_pem(pkcs8::LineEnding::LF).unwrap()
    );

    println!(
        "Alice 预共享密钥: {:?}",
        hex::encode(alice_shared_secret.raw_secret_bytes())
    );
    println!(
        "Bob 预共享密钥: {:?}",
        hex::encode(bob_shared_secret.raw_secret_bytes())
    );

    println!("==================== AES 加解密 ===================");

    // 创建cipher
    let alice_shared = alice_shared_secret.raw_secret_bytes();
    let alice_cipher = Aes256Gcm::new_from_slice(&alice_shared).unwrap();

    // 创建nonce
    let mut nonce_bytes = [0u8; 12];
    rand_core::OsRng.fill_bytes(&mut nonce_bytes);
    let nonce = aes_gcm::Nonce::from(nonce_bytes);

    println!("nonce_bytes: {}", hex::encode(&nonce_bytes));

    // Alice 加密
    let plaintext = b"Hello Bob, this is a secret from Alice!";
    let ciphertext = alice_cipher.encrypt(&nonce, plaintext.as_slice()).unwrap();

    println!("Alice 密文 (hex):  {}", hex::encode(&ciphertext));
    println!("Alice 密文 (char): {}", to_ascii_visible(&ciphertext));

    // Bob 解密
    let bob_shared = bob_shared_secret.raw_secret_bytes();
    let bob_cipher = Aes256Gcm::new_from_slice(&bob_shared).unwrap();
    let decrypted = bob_cipher.decrypt(&nonce, ciphertext.as_slice()).unwrap();

    println!("Bob 解密: {:?}", String::from_utf8(decrypted).unwrap());
}

fn to_ascii_visible(bytes: &[u8]) -> String {
    bytes
        .iter()
        .map(|&b| {
            if b.is_ascii_graphic() || b == b' ' {
                b as char
            } else {
                '.'
            }
        })
        .collect()
}
