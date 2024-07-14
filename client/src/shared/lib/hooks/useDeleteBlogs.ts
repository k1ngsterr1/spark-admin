'use client';

import axios from 'axios';
import { useState } from 'react';

export function useDeleteBlogCard() {

  const deleteBlog = async (blogId) => {
    if (!blogId) {
      console.error('blogId is required');
      return;
    }

    const blogIdString = String(blogId);

    try {
      const response = await axios.delete(
        `https://ferla-backend-production.up.railway.app/api/blog/delete/${blogIdString}/SPARK-STUDIO-85209af2e07011fafd442671ef8ae84b647be17c7f517ea5942075dda6fbeeb7`, 
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Deleted blog data:', response.data);
      window.location.reload(); 
    } catch (error) {
      console.error('There was an error deleting the blog:', error);
    }
  };

  return { deleteBlog};
}