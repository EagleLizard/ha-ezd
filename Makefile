run:
	docker run -d –name = homeassistant -v /home/pi/homeassistant_docker_data_vol:/config –net=host homeassistant/home-assistant