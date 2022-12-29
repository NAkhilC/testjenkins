#!/bin/bash
def templateName = 'nodejs-example' 
pipeline {
  agent {
    node {
      label 'nodejs'
    }
  }
  options {
    timeout(time: 20, unit: 'MINUTES') 
  }
  stages {
    stage('build') {
        steps {
            script {
               echo "Using project:"
            }
        }
    }
  }
}