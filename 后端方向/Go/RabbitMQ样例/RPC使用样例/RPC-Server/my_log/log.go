package my_log

import (
	"log"

	"github.com/fatih/color"
)

func FailOnError(err error, msg string) {
	if err != nil {
		red := color.New(color.FgRed).SprintFunc()
		errText := color.New(color.FgWhite).Add(color.BgRed).SprintFunc()
		log.Panicf("%s %s: %s", red("[ERROR]"), errText(msg), red(err))
	}
}

func Info(format string, msg ...any) {
	blue := color.New(color.FgBlue).SprintFunc()
	logParams := []any{blue("[INFO]")}
	logParams = append(logParams, msg...)
	log.Printf("%s "+format, logParams...)
}
