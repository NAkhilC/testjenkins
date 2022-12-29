

library identifier: 'mylibraryname@master',
    // 'mylibraryname' is just an identifier, it can be anything you like
    // 'master' refers to a valid git ref (branch)
    retriever: modernSCM([
      $class: 'GitSCMSource',
      remote: 'https://github.com/NAkhilC/testjenkins.git'
])

pipeline {
    agent any
    stages {
        stage('Demo') {
            steps {
                echo 'Hello world'
                yourCustomStep 'your_arg'
            }
        }
    }
}