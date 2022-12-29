

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
}
}