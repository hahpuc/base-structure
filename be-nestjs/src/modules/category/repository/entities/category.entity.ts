import { BaseEntity } from '@common/base/repositories/entities/base.entity';
import { BlogPost } from '@modules/blog-post/repository/entities/blog-post.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ nullable: true })
  description: string;

  @Column('int', { nullable: true })
  order_index: number;

  @OneToMany(() => BlogPost, (post) => post.category_id)
  blog_posts: BlogPost[];
}
