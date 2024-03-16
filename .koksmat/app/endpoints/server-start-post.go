// -------------------------------------------------------------------
// Generated by 365admin-publish/api/20 makeschema.ps1
// -------------------------------------------------------------------
/*
---
title: 10-start-onmac.ps1
---
*/
package endpoints

import (
	"context"

	"github.com/swaggest/usecase"

	"github.com/365admin/nats-infrastructure/execution"
)

func ServerStartPost() usecase.Interactor {
	type Request struct {
	}
	u := usecase.NewInteractor(func(ctx context.Context, input Request, output *string) error {

		_, err := execution.ExecutePowerShell("john", "*", "nats-infrastructure", "10-server", "10-start-onmac.ps1", "")
		if err != nil {
			return err
		}

		return err

	})
	u.SetTitle("10-start-onmac.ps1")
	// u.SetExpectedErrors(status.InvalidArgument)
	u.SetTags("Server")
	return u
}
