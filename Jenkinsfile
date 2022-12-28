node {
    def app
    stage('Clone repository') {
        checkout scm
    }
    stage('Build image') {
        app = docker.build("akhil2715/testnodeapp")
    }
    stage('Push image') {
        docker.withRegistry('https://registry.hub.docker.com', 'docker') {
            app.push("latest")
        }
    }
}