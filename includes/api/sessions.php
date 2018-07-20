<?php
/**
 * Function to get the session topics
 *
 * @param [type] $session
 * @return array
 */
function get_session_terms($session){
   $topics = [];
   $sessionTerms = wp_get_post_terms($session->ID, 'topics');
   foreach($sessionTerms as $term) {
      array_push($topics, array(
        'id' => $term->term_id,
        'label' => $term->name,
        'color' => get_field('topic_color', $term)
    )); 
   } 
   return $topics;
}

/**
 * Function to get the session speakers
 *
 * @param [type] $session
 * @return array
 */
function get_session_speakers($session){
    $speakers = [];
    $speakerPosts =  get_field('speakers', $session);
    if( $speakerPosts ) {
        foreach($speakerPosts as $speaker) {
            $speakerMeta = get_fields($speaker->ID);
            array_push($speakers, array(
                'id' => $speaker->ID,
                'name'=> $speaker->post_title,
                'description'=> $speaker->post_excerpt,
                'image' => $speakerMeta['image'],
                'title' => $speakerMeta['title'],
                'designation' => $speakerMeta['designation'],
                'social' => array(
                    'linkedin' => $speakerMeta['linkedin'],
                    'facebook' => $speakerMeta['facebook'],
                    'twitter' => $speakerMeta['twitter'],
                    'github' => $speakerMeta['github'],
                )
            ));
        }
    }
    
    return $speakers;
}
/**
 * Function to get the session meta data
 *
 * @param [type] $session
 * @return array
 */
function get_session_meta($session) {
    $sessionMeta = get_fields($session->ID);
    return array(
        'order' => $sessionMeta['order'],
        'venue' => html_entity_decode($sessionMeta['venue']),
        'time' => $sessionMeta['time'],
        'type' => $sessionMeta['type'],
        'duration' => $sessionMeta['duration'],
        'venueColor' => $sessionMeta['venue_color'],
    );
}

/**
 * Function to format the final output for a term
 *
 * @param $term
 * @return array
 */
function get_formated_session_data($session){
   return array(
        'id' => $session->ID,
        'title' => $session->post_title,
        'content' => $session->post_content,
        'excerpt' => $session->post_excerpt,
        'topics' => get_session_terms($session),
        'speakers' => get_session_speakers($session),
        'meta' => get_session_meta($session)
    );
}

/**
 * Function to get all the topics associated with session
 * This will be used for filtering
 *
 * @return void
 */
function get_sessions() {
    $sessions = [];
    $posts = get_posts(array(
        'post_type'         => 'session',
        'posts_per_page'    => -1,
    ));
    foreach($posts as $session){
        array_push($sessions, get_formated_session_data($session));
    }

    return $sessions;
}

add_action( 'rest_api_init', function () {
    register_rest_route( 'cmto/v1', '/sessions', array(
      'methods' => 'GET',
      'callback' => 'get_sessions'
    ));
  });
?>