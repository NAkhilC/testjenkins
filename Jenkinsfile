
def templatePath = 'https://raw.githubusercontent.com/NAkhilC/testjenkins/master/jj.yaml' 
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
    stage('preamble') {
        steps {
            script {
                openshift.withCluster() {
                    openshift.withProject() {
                        echo "Using project: ${openshift.project()}"
                    }
                }
            }
        }
    }
    stage('cleanup') {
      steps {
        script {
            openshift.withCluster() {
                openshift.withProject() {
                  openshift.selector("all", [ template : templateName ]).delete() 
                  if (openshift.selector("secrets", templateName).exists()) { 
                    openshift.selector("secrets", templateName).delete()
                  }
                }
            }
        }
      }
    }
    stage('create') {
      steps {
        script {
            openshift.withCluster() {
                openshift.withProject() {
                  openshift.newApp(apiVersion: v1
kind: Template
metadata:
  annotations:
    description: build config template
  name: build-config-template
parameters:
  - description: Name of the service to be deployed
    displayName: Service Name
    name: SERVICE_NAME
  - description: Git repository where service is stored
    displayName: GIT Service URL
    name: SERVICE_GIT_URL
objects:
  - apiVersion: v1
    kind: BuildConfig
    metadata:
      name: nothing
    spec:
      output:
        to:
          kind: ImageStreamTag
          name: imagenothing:latest
      source:
        contextDir: /
        git:
          ref: master
          uri: https://github.com/NAkhilC/testjenkins.git
        type: Git
      strategy:
        sourceStrategy:
          env:
            - name: GIT_SSL_NO_VERIFY
              value: "true"
            - name: NODE_TLS_REJECT_UNAUTHORIZED
              value: "0"
          from:
            kind: ImageStreamTag
            name: s2i-openshift-alpine-nodejs:latest
            namespace: drya024
        type: Source
) 
                }
            }
        }
      }
    }
    stage('build') {
      steps {
        script {
            openshift.withCluster() {
                openshift.withProject() {
                  def builds = openshift.selector("bc", templateName).related('builds')
                  timeout(5) { 
                    builds.untilEach(1) {
                      return (it.object().status.phase == "Complete")
                    }
                  }
                }
            }
        }
      }
    }
    stage('deploy') {
      steps {
        script {
            openshift.withCluster() {
                openshift.withProject() {
                  def rm = openshift.selector("dc", templateName).rollout().latest()
                  timeout(5) { 
                    openshift.selector("dc", templateName).related('pods').untilEach(1) {
                      return (it.object().status.phase == "Running")
                    }
                  }
                }
            }
        }
      }
    }
    stage('tag') {
      steps {
        script {
            openshift.withCluster() {
                openshift.withProject() {
                  openshift.tag("${templateName}:latest", "${templateName}-staging:latest") 
                }
            }
        }
      }
    }
  }
}