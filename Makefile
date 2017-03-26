########################################################
.PHONY: build example


build:
	@tsc


example:
	@cd example && node ../bin/hersite build
