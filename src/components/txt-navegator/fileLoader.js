document.querySelector("#file-input").addEventListener("change", function () {
  // files that user has chosen
  let all_files = this.files;
  if (all_files.length === 0) {
    alert("Error : No file selected");
    return;
  }

  // first file selected by user
  let file = all_files[0];

  // files types allowed
  let allowed_types = ["text/plain"];
  if (allowed_types.indexOf(file.type) === -1) {
    alert("Error : Incorrect file type");
    return;
  }

  // Max 2 MB allowed
  let max_size_allowed = 2 * 1024 * 1024;
  if (file.size > max_size_allowed) {
    alert("Error : Exceeded size 2MB");
    return;
  }

  // file validation is successfull
  // we will now read the file

  let reader = new FileReader();

  // file reading started
  reader.addEventListener("loadstart", function () {
    document.querySelector("#file-input-label").style.display = "none";
  });

  // file reading finished successfully
  reader.addEventListener("load", function (e) {
    let text = e.target.result;

    // contents of the file
    document.querySelector("#contents").innerHTML = text;
    document.querySelector("#contents").style.display = "block";

    document.querySelector("#file-input-label").style.display = "block";
  });

  // file reading failed
  reader.addEventListener("error", function () {
    alert("Error : Failed to read file");
  });

  // file read progress
  reader.addEventListener("progress", function (e) {
    if (e.lengthComputable === true) {
      document.querySelector("#file-progress-percent").innerHTML = Math.floor(
        (e.loaded / e.total) * 100
      );
      document.querySelector("#file-progress-percent").style.display = "block";
    }
  });

  // read as text file
  reader.readAsText(file);
});
