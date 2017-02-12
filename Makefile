########################################################
.PHONY: sample


sample:
	@tsc
	@cd sample && node ../bin/hersite build
