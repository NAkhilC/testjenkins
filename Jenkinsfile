

pipeline {
environment {
registry = "akhil2715/testnodeapp"
registryCredential = 'docker'
dockerImage = ''
}
agent any
stages {
stage('Cloning our Git') {
steps {
git 'https://github.com/NAkhilC/testjenkins.git'
}
}
stage('Building our image') {
steps{
script {
dockerImage = docker.build registry + ":$BUILD_NUMBER"
}
}
}
stage('Push image') {
    withCredentials([usernamePassword( credentialsId: 'docker', usernameVariable: 'akhil2715', passwordVariable: 'meghana2715')]) {
        def registry_url = "registry.hub.docker.com/"
        bat "docker login -u $USER -p $PASSWORD ${registry_url}"
        docker.withRegistry("http://${registry_url}", "docker") {
            // Push your image now
           dockerImage.push()
        }
    }
}
}
}