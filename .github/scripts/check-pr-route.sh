#!/usr/bin/env bash
set -euo pipefail

if [[ "${GITHUB_EVENT_NAME:-}" != "pull_request" ]]; then
  echo "No pull request route to validate for this event."
  exit 0
fi

case "${PR_BASE_REF:-}" in
  main)
    if [[ "${PR_HEAD_REF:-}" != "develop" ||
          -z "${GITHUB_REPOSITORY:-}" ||
          "${PR_HEAD_REPOSITORY:-}" != "${GITHUB_REPOSITORY:-}" ]]; then
      echo "::error::PRs para main devem partir de develop neste repositório. Abra primeiro um PR para develop."
      exit 1
    fi
    echo "Release route accepted: develop -> main."
    ;;
  develop)
    echo "Development pull request accepted."
    ;;
  *)
    echo "::error::Destino inesperado: use develop para alterações e main para releases."
    exit 1
    ;;
esac
