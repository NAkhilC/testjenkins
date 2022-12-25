node {

    checkout scm

    docker.withRegistry('https://registry.hub.docker.com', 'docker') {

        def customImage = docker.build("akhil2715/dockerwebapp")

        /* Push the container to the custom Registry */
        customImage.push()
    }
