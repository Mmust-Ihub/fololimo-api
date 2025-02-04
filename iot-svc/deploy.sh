#! /bin/bash

: '---- CONSTANTS ----'
COMPOSE_FILE="docker-compose.yaml"
IOT_PATH=/iot-svc

set -e

# change path to the IOT working dir
function change_path(){
    cd $IOT_PATH || exit
    echo "This is the current working dir: $IOT_PATH"
}

# stop the existing containers
function stop_running_containers() {
    echo "Stopping the running containers ..."

    docker compose -f $COMPOSE_FILE down
    docker image prune -f
    echo "removed the old containers and daggling images ...."
}

function deploy() {
    if [ ! -f "$COMPOSE_FILE" ]; then
        echo -e "Docker Compose file '$COMPOSE_FILE' not found.\n Exiting..."
        exit 1

    else
        # finally deploy the application
        echo "Finally!. Your application is ready for deployment ..."
        docker compose -f ${COMPOSE_FILE} up -d --build
    fi

}

function main() {
    change_path
    stop_running_containers
    deploy
}

main