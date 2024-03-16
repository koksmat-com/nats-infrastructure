package magicapp

import (
	"github.com/spf13/cobra"

	"github.com/365admin/nats-infrastructure/cmds"
	"github.com/365admin/nats-infrastructure/utils"
)

func RegisterCmds() {
	RootCmd.PersistentFlags().StringVarP(&utils.Output, "output", "o", "", "Output format (json, yaml, xml, etc.)")

	healthCmd := &cobra.Command{
		Use:   "health",
		Short: "Health",
		Long:  `Describe the main purpose of this kitchen`,
	}
	HealthPingPostCmd := &cobra.Command{
		Use:   "ping  pong",
		Short: "Ping",
		Long:  `Simple ping endpoint`,
		Args:  cobra.MinimumNArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			ctx := cmd.Context()

			cmds.HealthPingPost(ctx, args)
		},
	}
	healthCmd.AddCommand(HealthPingPostCmd)

	RootCmd.AddCommand(healthCmd)
	magicCmd := &cobra.Command{
		Use:   "magic",
		Short: "Magic Buttons",
		Long:  `Describe the main purpose of this kitchen`,
	}

	RootCmd.AddCommand(magicCmd)
	serverCmd := &cobra.Command{
		Use:   "server",
		Short: "Server",
		Long:  `Describe the main purpose of this kitchen`,
	}
	ServerKillPostCmd := &cobra.Command{
		Use:   "kill ",
		Short: "10-kill.ps1",
		Long:  ``,
		Args:  cobra.MinimumNArgs(0),
		Run: func(cmd *cobra.Command, args []string) {
			ctx := cmd.Context()

			cmds.ServerKillPost(ctx, args)
		},
	}
	serverCmd.AddCommand(ServerKillPostCmd)
	ServerStartPostCmd := &cobra.Command{
		Use:   "start ",
		Short: "10-start-onmac.ps1",
		Long:  ``,
		Args:  cobra.MinimumNArgs(0),
		Run: func(cmd *cobra.Command, args []string) {
			ctx := cmd.Context()

			cmds.ServerStartPost(ctx, args)
		},
	}
	serverCmd.AddCommand(ServerStartPostCmd)

	RootCmd.AddCommand(serverCmd)
	setupCmd := &cobra.Command{
		Use:   "setup",
		Short: "Setup",
		Long:  `Describe the main purpose of this kitchen`,
	}

	RootCmd.AddCommand(setupCmd)
	tasksCmd := &cobra.Command{
		Use:   "tasks",
		Short: "Tasks",
		Long:  `Describe the main purpose of this kitchen`,
	}

	RootCmd.AddCommand(tasksCmd)
	provisionCmd := &cobra.Command{
		Use:   "provision",
		Short: "Provision",
		Long:  `Describe the main purpose of this kitchen`,
	}
	ProvisionSupersetIngressPostCmd := &cobra.Command{
		Use:   "superset-ingress ",
		Short: "Superset Ingress",
		Long:  ``,
		Args:  cobra.MinimumNArgs(0),
		Run: func(cmd *cobra.Command, args []string) {
			ctx := cmd.Context()

			cmds.ProvisionSupersetIngressPost(ctx, args)
		},
	}
	provisionCmd.AddCommand(ProvisionSupersetIngressPostCmd)

	RootCmd.AddCommand(provisionCmd)
}
