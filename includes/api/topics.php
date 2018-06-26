<?php
/**
 * Function to format the final output for a term
 *
 * @param $term
 * @return array
 */
function get_formated_topic_data($term){
   return array(
        'id' => $term->term_id,
        'label' => $term->name,
        'color' => get_field('topic_color', $term)
    );
}

/**
 * Function to get all the topics associated with session
 * This will be used for filtering
 *
 * @return void
 */
function get_topics() {
    $topics = [];
    $terms =  get_terms(array(
        'taxonomy' => 'topics',
        'hide_empty' => false,
    ));
    foreach($terms as $term){
        array_push($topics, get_formated_topic_data($term));
    }
    return $topics;
}

add_action( 'rest_api_init', function () {
    register_rest_route( 'cmto/v1', '/topics', array(
      'methods' => 'GET',
      'callback' => 'get_topics'
    ));
  });
?>