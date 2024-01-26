#!/bin/bash
readonly SOURCE_DIR="/home/pi/dkpi/homeassistant"
readonly BACKUP_DIR="/mnt/backup/homeassistant"
readonly BACKUP_PATH="${BACKUP_DIR}/$(date '+%F')"
readonly LATEST_LINK="${BACKUP_DIR}/latest"

mkdir -p "${BACKUP_DIR}"

docker stop homeassistant

rsync -a --delete \
  "${SOURCE_DIR}/" \
  --link-dest "${LATEST_LINK}" \
  "${BACKUP_PATH}"

rm -rf "${LATEST_LINK}"
ln -s "${BACKUP_PATH}" "${LATEST_LINK}"

docker start homeassistant

# Make file executable
# sudo chmod u+x backup.sh