########################################################
.PHONY: build example


build:
	@tsc


example:
	@tsc
	@cd example && node ../bin/hersite build
