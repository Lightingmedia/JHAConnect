'use client';

import { useState } from 'react';
import { communityPosts, communityUsers } from '@/lib/data';
import type { User, Post } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { ThumbsUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function StatusUpdate({ currentUser }: { currentUser: User }) {
  const [posts, setPosts] = useState<Post[]>(communityPosts);
  const [newPostContent, setNewPostContent] = useState('');

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost: Post = {
      id: `post${posts.length + 1}`,
      userId: currentUser.id,
      content: newPostContent,
      timestamp: new Date().toISOString(),
      likes: [],
    };
    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const liked = post.likes.includes(currentUser.id);
          const newLikes = liked
            ? post.likes.filter((id) => id !== currentUser.id)
            : [...post.likes, currentUser.id];
          return { ...post, likes: newLikes };
        }
        return post;
      })
    );
  };

  return (
    <div className="space-y-6">
      <Card className="bg-background/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <form onSubmit={handlePostSubmit} className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src={currentUser.profilePicture} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Textarea
                placeholder="What's on your mind?"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="flex-1"
              />
            </div>
            <Button type="submit" className="self-end">
              Post Update
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {posts.map((post) => {
          const user = communityUsers.find((u) => u.id === post.userId);
          if (!user) return null;
          const isLiked = post.likes.includes(currentUser.id);

          return (
            <Card key={post.id} className="bg-background/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={user.profilePicture} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-baseline gap-2">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
                      </p>
                    </div>
                    <p className="text-sm">{post.content}</p>
                    <div className="flex items-center gap-4 pt-2">
                      <Button
                        variant={isLiked ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className="flex items-center gap-2"
                      >
                        <ThumbsUp className={`h-4 w-4 ${isLiked ? 'text-primary fill-current' : ''}`} />
                        <span>{post.likes.length}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
