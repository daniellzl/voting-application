var addOption = document.querySelector("#add-option");
var options = document.querySelector("#options");
addOption.addEventListener("click", function() {
  options.insertAdjacentHTML('beforeend', '<label>Option</label> <input name="options" type="text" class="form-control" />');
});
