tinymce.init({
    selector:'#tiny-mce-post-body',
    plugins: ["advlist lists link autolink autosave code", 'preview', 'searchreplace', 'wordcount', 'media table emoticons image imagetools'],
    toolbar: 'bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | forecolor backcolor emoticons | code preview',
    height: 300,
    automatic_uploads: true,
    images_upload_url:'/uploads/postImage',
    relative_urls:false,
    images_upload_handler: function(blobInfo,success,failure){
        let headers = new Headers();
        headers.append('Accept', 'Application/JSON');

        let formData = new FormData();
        formData.append('post-image', blobInfo.blob(), blobInfo.filename());


        let request = new Request('/upload/postImage',{
            method:'POST',
            headers,
            mode:'cors',
            body: formData
        });

        fetch(request)
            .then(res=>res.json())
            .then(data=> success(data.imgUrl))
            .catch(err=> failure('HTTP error'))





    }
})

