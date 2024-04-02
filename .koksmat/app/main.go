package main

import (
	"runtime/debug"
	"strings"

	"github.com/365admin/nats-infrastructure/magicapp"
)

func main() {
	info, _ := debug.ReadBuildInfo()

	// split info.Main.Path by / and get the last element
	s1 := strings.Split(info.Main.Path, "/")
	name := s1[len(s1)-1]
	description := `---
title: nats-infrastructure
description: Describe the main purpose of this kitchen
---

# nats-infrastructure
`
	magicapp.Setup(".env")
	magicapp.RegisterServeCmd("nats-infrastructure", description, "0.0.1", 8334)
	magicapp.RegisterSnifferCmd("nats-infrastructure")
	magicapp.RegisterCmds()
	magicapp.Execute(name, "nats-infrastructure", "")
}
