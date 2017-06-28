<?php 
/*
Template Name: page template
*/

$context = Timber::get_context();
$context['page'] = new TimberPost();
Timber::render('views/page/page.twig', $context);