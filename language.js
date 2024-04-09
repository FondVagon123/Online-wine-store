
document.getElementById('languageSelector').addEventListener('change', function() {
    var selectedLanguage = this.value;
    changeLanguage(selectedLanguage);
  });
  
  document.querySelectorAll('.languageButton').forEach(button => {
    button.addEventListener('click', function() {
      var selectedLanguage = this.getAttribute('data-lang');
      changeLanguage(selectedLanguage);
    });
  });
  
  
  function changeLanguage(language) {
    
  }
  