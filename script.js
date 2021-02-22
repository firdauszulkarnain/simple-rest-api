function cariBerita(){
  $('#article-list').html('');
  $.ajax({
    url: 'https://newsapi.org/v2/everything',
    type: 'get',
    dataType: 'json',
    data: {
      'apikey': 'b10f3f09477d49cdb986a038a7853237',
      'q' : $('#keyword').val(),
      'language' : 'id'
    },
    success: function (result){
      
      if(result.totalResults == 0){
        $('#article-list').html(`
        <div class ="col">
          <h1 class="text-center">Berita Tidak Ditemukan!</h1>
        </div>`)
      }else{
        let articles = result.articles;
        $.each(articles, function(i, data){
          var date = data.publishedAt.substring (0, data.publishedAt.length-10)
            $('#article-list').append(`
                <div class = "col-md-4">
                  <div class="card mb-3">
                    <img src="`+ data.urlToImage +`" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">`+ data.title +`</h5>
                      <p class="card-text">`+ date +`</p>
                       <a href="#" class="card-link float-right">Lihat Berita</a>
                    </div>
                  </div>
                </div>
            `);
        });
        $('#keyword').val('');
      }
    }
  });
}


$("#cari").on('click', function () {
    cariBerita();
});

$("#keyword").on('keyup', function(e){
  if(e.keyCode === 13){
     cariBerita();
  }
})