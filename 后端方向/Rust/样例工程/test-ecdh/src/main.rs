use p256::{
    SecretKey,
    ecdh::{self},
    pkcs8::{EncodePrivateKey, EncodePublicKey},
};
use rand_core::OsRng;

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

    // 验证完毕，确认正确
}
