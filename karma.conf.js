module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // Puedes agregar opciones de configuración de Jasmine aquí si es necesario
        // Por ejemplo, puedes desactivar la ejecución aleatoria con `random: false`
        // o establecer una semilla específica con `seed: 4321`
      },
      clearContext: false // Deja visible la salida del Jasmine Spec Runner en el navegador
    },
    jasmineHtmlReporter: {
      suppressAll: true // Elimina las trazas duplicadas
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false, // Desactiva la opción de vigilancia para entornos de CI
    browsers: ['ChromeHeadless'], // Utiliza ChromeHeadless para ejecutar las pruebas sin cabeza en CI
    singleRun: true, // Configuración de ejecución única para entornos de CI
    restartOnFileChange: true
  });
};
