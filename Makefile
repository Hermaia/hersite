########################################################
.PHONY: build example


build:
	@tsc


sample:
	@tsc
	@cd example && node ../bin/hersite build
