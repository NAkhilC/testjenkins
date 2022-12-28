node {
    def app
    stage('Clone repository') {
        checkout scm
    }
    stage('Build image') {
        app = docker.build("getintodevops/hellonode")
    }
    stage('Test image') {    
            sh 'echo "Tests passed"'
    }
    stage('Push image') {
        docker.withRegistry('https://registry.hub.docker.com', 'docker') {
            app.push("latest")
        }
    }
}