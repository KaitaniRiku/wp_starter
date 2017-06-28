<?php
$context = Timber::get_context();
$context['PostTypeName'] = Timber::get_posts(array('post_type' => 'work', 'posts_per_page' => -1, 'order_by' => 'date'));
Timber::render('views/PostTypeName/PostTypeName.twig', $context);
