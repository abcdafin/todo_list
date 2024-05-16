pipeline {
    agent any
    
    stages {
        stage('Persiapan') {
            steps {
                // Langkah-langkah persiapan seperti mengambil kode sumber dari repositori
                git 'https://github.com/abcdafin/todo_list.git'
            }
        }
        stage('Build') {
            steps {
                // Langkah-langkah untuk melakukan build aplikasi
                sh 'npm install' // Contoh untuk proyek Node.js
                sh 'npm run build' // Contoh untuk proyek Node.js
            }
        }
        stage('Uji') {
            steps {
                // Langkah-langkah untuk menjalankan pengujian
                sh 'npm test' // Contoh untuk proyek Node.js
            }
        }
        stage('Deploy') {
            steps {
                // Langkah-langkah untuk melakukan deploy aplikasi
                sh 'npm run deploy' // Contoh untuk proyek Node.js
            }
        }
    }
}
