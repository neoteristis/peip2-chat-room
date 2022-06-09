<?php
    session_start();
    if (!isset($_SESSION["pseudo"])) {
        header("Location: signup.php");
        exit();
    } else {
        $pseudo = $_SESSION["pseudo"];
    }
?>

<html>
<head>
    <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <link rel="stylesheet" href="css/internet.css">

    <script type="text/javascript" src="js/simpleajax.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
    <script type="text/javascript" src="js/channels.js"></script>
    <script type="text/javascript" src="js/conversation.js"></script>
    <script type="text/javascript" src="js/user_profile.js"></script>
</head>

<body>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <div class="container app">
        <div class="row app-one">
            <div class="col-sm-4 side">

                <!------------------------------------------->
                <!-- BEGINNING OF THE LIST OF PERSON SPACE -->
                <!------------------------------------------->
                <div class="side-one">
                    <div class="row heading">
                        <div class="col-sm-3 col-xs-3 heading-avatar">
                            <div class="heading-avatar-icon">
                                <img id="current-user-avatar" src="https://images.pond5.com/circle-loading-icon-transparent-background-footage-126963108_iconl.jpeg" alt="user-avatar">
                            </div>
                        </div>

                        <div id="current-user-pseudo" class="col-sm-4 col-xs-4">
                            User Pseudo
                        </div>

                        <div class="col-sm-1 col-xs-1  heading-dot  pull-right">
                            <i class="fa fa-ellipsis-v fa-2x  pull-right" aria-hidden="true"></i>
                        </div>
                        <div class="col-sm-2 col-xs-2 heading-compose  pull-right">
                            <i id="new-channel" class="fa fa-comments fa-2x  pull-right" aria-hidden="true"></i>
                        </div>
                    </div>

                    <div class="row searchBox">
                        <div class="col-sm-12 searchBox-inner">
                            <div class="form-group has-feedback">
                                <label for="searchText"></label>
                                <input id="searchText" type="text" class="form-control" name="searchText"
                                                                       placeholder="Search">
                            </div>
                        </div>
                    </div>

                    <!-- All conversations will be placed here -->
                    <div class="row sideBar">
                    </div>
                </div>
            </div>

            <!----------------------------------------->
            <!-- BEGINNING OF THE CONVERSATION SPACE -->
            <!----------------------------------------->
            <div class="col-sm-8 conversation">
                <div class="row heading">
                    <div class="col-sm-2 col-md-1 col-xs-3 heading-avatar">
                        <div class="heading-avatar-icon">
                            <img src="https://images.pond5.com/circle-loading-icon-transparent-background-footage-126963108_iconl.jpeg">
                        </div>
                    </div>
                    <div class="col-sm-8 col-xs-7 heading-name">
                        <a class="heading-name-meta">Waiting...</a>
                    </div>
                    <div class="col-sm-1 col-xs-1  heading-dot pull-right">
                        <i class="fa fa-ellipsis-v fa-2x  pull-right" aria-hidden="true"></i>
                    </div>
                </div>

                <div class="row message" id="conversation">
                </div>

                <!----------------------------------------->
                <!-- BEGINNING OF THE PLACE TO TYPE TEXT -->
                <!----------------------------------------->
                <div class="row reply">
                    <div class="col-sm-9 col-xs-9 reply-main">
                        <label for="comment"></label>
                        <textarea class="form-control" rows="1" id="comment"></textarea>
                    </div>
                    <div class="col-sm-1 col-xs-1 reply-send">
                        <i class="fa fa-send fa-2x" aria-hidden="true" onclick="sendNewMessage()"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
