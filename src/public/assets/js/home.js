$('#articleForm').submit(function (e) {
    e.preventDefault();
    var article = $('#article').val();
    axios.post('/postArticle', {
        article
    }).then(response => {
        const post = response.data.data;
        $(".timeline-content").prepend(`<div class="card"> \
                                    <div class="post-title d-flex align-items-center"> \
                                        <!-- profile picture end --> \
                                        <div class="profile-thumb"> \
                                            <a href="#"> \
                                                <figure class="profile-thumb-middle">\
                                                    <img src="`+ post.user.image + `" alt="profile picture">\
                                                </figure>\
                                            </a>\
                                        </div>\
                                        <!-- profile picture end -->\
                                        <div class="posted-author">\
                                            <h6 class="author"><a href="/user/profile">`+ post.user.full_name + `</a></h6>\
                                            <span class="post-time">`+ new Date(post.user.createdAt).getHours() + ":" + new Date(post.user.createdAt).getMinutes() +
            " " + new Date(post.user.createdAt).getDate() + "/" + new Date(post.user.createdAt).getMonth() + "/" + new Date(post.user.createdAt).getFullYear() + ` </span>\
                                        </div>\
                                    </div>\
                                    <!-- post title start -->\
                                    <div class="post-content">\
                                        <p class="post-desc">`+ post.content + `</p>\
                                        <div class="post-meta">\
                                            <ul class="comment-share-meta">\
                                                <li>\
                                                    <button class="post-comment">\
                                                        <i class="bi bi-chat-bubble"></i>\
                                                        <span>`+ post.comments.length + `</span>\
                                                    </button>\
                                                </li>\
                                            </ul>\
                                        </div>\
                                    </div>\
                                </div>`);

        $('#article').val('');

    }).catch(err => {
        console.log(err)
    })
    // $.ajax({
    //     url: 'http://localhost:3000/postArticle',
    //     type: 'POST',
    //     data: {
    //         article,
    //     },
    //     success: function(data){
    //         console.log(data);
    //     }, 

    // });
})

$('#commentForm').submit(function (e) {
    e.preventDefault();
    var comment = $('#comment').val();
    var postId = $('#postId').val();
    axios.post('/comment', {
        postId,
        comment
    }).then(response => {
        const comment = response.data.data;
        $(".data-info").prepend(`
                    <div class="data-info-with-button">  
                        <div class="data-info-detail">
                        <img src="`+ comment.user.image + `" alt="" class="rounded-circle" width="40" height="40"> 
                            <div> 
                                <h6>`+ comment.user.full_name + `</h6>
                                <div>`+ comment.comment + `</div>
                            </div>  
                        </div>
                        <div class="post-settings-bar" id="commentOption">
                        <span></span>
                        <span></span>
                        <span></span>
                            <div class="post-settings arrow-shape">
                                <ul>
                                    <li><button >delete post</button></li>
                                    <li><button>edit post</button></li>
                                </ul>
                            </div>
                        </div>
                    </div><hr>`);

        $('#comment').val('');

    }).catch(err => {
        console.log(err)
    })
})

$(document).on("click", ".post-comment", function () {
    $('.data-info').empty();
    var post = $(this).data('id');
    axios.get('/post/' + post).then(result => {
        const post = result.data.data.post;
        const comments = result.data.data.comments;
        const user = result.data.data.user;
        comments.map(element => {
            if(element.user._id == user._id) {
                $('.data-info').append(`
                                <div class="data-info-with-button" id="`+ element._id + `">

                                    <div class="data-info-detail">
                                        <img src="`+ element.user.image + `" alt="" class="rounded-circle" width="40" height="40"> 
                                        <div> 
                                            <h6>`+ element.user.full_name + `</h6>
                                            <div>`+ element.comment + `</div>
                                        </div>
                                    </div>

                                    <div class="post-settings-bar">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <div class="post-settings arrow-shape">
                                            <ul>
                                                <li><button onClick='deleteComment("`+ element._id + `")'>delete post</button></li>
                                                <li><button>edit post</button></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>`)
            } else {
                $('.data-info').append(`
                                <div class="data-info-with-button" id="`+ element._id + `">

                                    <div class="data-info-detail">
                                        <img src="`+ element.user.image + `" alt="" class="rounded-circle" width="40" height="40"> 
                                        <div> 
                                            <h6>`+ element.user.full_name + `</h6>
                                            <div>`+ element.comment + `</div>
                                        </div>
                                    </div>
                                </div>`)
            }
            
        })

    }).catch(err => {
        console.log(err)
    })

    $(".modal-footer #postId").val(post);
})