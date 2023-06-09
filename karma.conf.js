module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    files: [
      // Agrega aquí tus archivos de prueba
    ],

    browsers: ['Chrome'],

    reporters: ['progress', 'kjhtml'],

    // ...otras configuraciones de Karma
  });
};
