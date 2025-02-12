var extra_image_button = document.querySelector("#extra_image");

var selected_images_container = document.querySelectorAll(".selected_images_container")[1];

var all_extra_images = [];

extra_image_button.addEventListener("change", e =>{
	if(extra_image_button.files.length){
		add_extra_image_to_list(extra_image_button.files[0]);
	}
});

function add_extra_image_to_list(file){
	if(file.type.startsWith("image/")){
		const reader = new FileReader();

		reader.readAsDataURL(file);

		reader.onload = () => {
			all_extra_images.push(reader.result);

			updateAllExtraImages();
		}
	}
}

function updateAllExtraImages(){
	selected_images_container.innerHTML = ``;

	all_extra_images.forEach((extra_image, index)=>{
		selected_images_container.innerHTML += `
		<div class="selected_image">
          <img src="${extra_image}">
          <i data-index="${index}" class="fa-solid fa-xmark"></i>
        </div>
		` 
	});

	selected_images_container.querySelectorAll("i").forEach((cancel_button)=>{
		cancel_button.addEventListener("click", (e)=>{
			all_extra_images.splice(parseInt(cancel_button.dataset.index), 1);

			updateAllExtraImages();
		});
	});
}