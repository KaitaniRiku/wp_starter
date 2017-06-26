<?php 
/*
Template Name: test template
*/

$context = Timber::get_context();
$context['page'] = new TimberPost();
Timber::render('views/test/test.twig', $context);