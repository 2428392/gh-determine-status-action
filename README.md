# gh-determine-status-action

GitHub action that will determine `success` or `failure` based on the result of the
provided outcome step. This action is for use when there can be multiple steps
leading up to setting the final deployment status and the last deploy step may not
be `success` or `failure`. It could be `skipped`, `cancelled`, etc...

## Inputs

| name      | description                 |
| --------- | --------------------------- |
| `outcome` | Outcome of the provide step |

## Usage

```yaml
Name: Delete Deployments

on:
  delete:
    branches-ignore:
      - main

  jobs:
    delete:
      runs-on: ubuntu-latest
      steps:
        - name: start deployment
          uses: Tallyb/deployments@0.5.0
          id: deployment
          with:
            step: start
            token: ${{ github.token }}
            env: ${{ env.APP_NAME }}
            ref: ${{ github.head_ref }}
            auto_inactive: 'true'
        - uses: my-cool-deploy-step-1
          id: deploy1
          continue-on-error: true
        - uses: my-cool-deploy-step-2
          id: deploy2
          continue-on-error: true
        - uses: 2428392/gh-determine-status-action
          id: deploymentStatus
          with:
            outcome: ${{ steps.deploy2.outcome }}
        - name: Finish Deployment
          if: ${{ steps.deployment.outcome != 'skipped' && steps.deployment.outcome != 'cancelled' }}
          uses: Tallyb/deployments@0.5.0
          with:
            step: finish
            token: ${{ github.token }}
            status: ${{ steps.deploymentStatus.outputs.status }}
            deployment_id: ${{ steps.deployment.outputs.deployment_id }}
```
