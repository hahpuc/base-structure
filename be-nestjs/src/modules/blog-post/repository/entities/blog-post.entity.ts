import { EStatus } from '@app/constant/app.enum';
import { BaseEntity } from '@common/base/repositories/entities/base.entity';
import { Category } from '@modules/category/repository/entities/category.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class BlogPost extends BaseEntity {
  @Column()
  title: string;

  @Column()
  slug: string;

  @Column('int', { nullable: true })
  order_index: number;

  @Column('text', { nullable: false })
  description: string;

  @Column('mediumtext', { nullable: false })
  content: string;

  @Column()
  thumbnail: string;

  @Column({ nullable: true })
  published_at: Date;

  @Column('tinyint', { default: EStatus.active })
  status: number;

  @ManyToOne(() => Category, (category) => category.blog_posts)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  category_id: number;
}
