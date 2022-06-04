<div id="navigation">
    <?php
    include("conversation.php");

    for ($i = 0; $i <= 5; $i++) {
        echo generate_conversation_div();
    }
    ?>
</div>