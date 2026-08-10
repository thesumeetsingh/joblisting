package com.sumeet.joblisting.repo;

import com.sumeet.joblisting.model.Post;

import java.util.List;

public interface SearchRepository {

    List<Post> findByText(String text);
}
