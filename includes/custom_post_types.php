<?php 

    function custom_post_types() {

        custom_post();
    }
    
    function custom_post() {
        $labels = array(
            'name'               => _x( 'PostTypeName', 'post type general name' ),
            'singular_name'      => _x( 'PostTypeName', 'post type singular name' ),
            'add_new'            => _x( 'Add PostTypeName', 'book' ),
            'add_new_item'       => __( 'Add New PostTypeName' ),
            'edit_item'          => __( 'Edit PostTypeName' ),
            'new_item'           => __( 'New PostTypeName' ),
            'all_items'          => __( 'All PostTypeName' ),
            'view_item'          => __( 'View PostTypeName' ),
            'search_items'       => __( 'Search PostTypeName' ),
            'not_found'          => __( 'No post found' ),
            'not_found_in_trash' => __( 'No post found in the Trash' ),
            'parent_item_colon'  => '',
            'menu_name'          => 'PostTypeName'
        );
        $args = array(
            'labels'        => $labels,
            'description'   => 'PostTypeName posts',
            'public'        => true,
            'menu_position' => 5,
            'taxonomies'    => array('category'),
            'supports'          => array( 'title','editor', 'revisions', 'thumbnail', 'post-formats', 'page-attributes'),
            'has_archive'   => true,
            'rewrite' => array('slug' => 'PostTypeName', 'with_front' => false) // with_front: false overides default permalink /blog
        );
        register_post_type( 'PostTypeName', $args );
    }