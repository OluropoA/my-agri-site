import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import slugify from 'slugify';

// GET /api/blog - Fetch all blog posts
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const published = searchParams.get('published');

        const posts = await prisma.blogPost.findMany({
            where: published ? { published: published === 'true' } : undefined,
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(posts);
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch blog posts' },
            { status: 500 }
        );
    }
}

// POST /api/blog - Create new blog post
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { title, content, category, tags, coverImage, published, slug: customSlug } = body;

        if (!title || !content) {
            return NextResponse.json(
                { error: 'Title and content are required' },
                { status: 400 }
            );
        }

        // Generate slug from title if not provided
        const slug = customSlug || slugify(title, { lower: true, strict: true });

        // Check if slug already exists
        const existingPost = await prisma.blogPost.findUnique({
            where: { slug },
        });

        if (existingPost) {
            return NextResponse.json(
                { error: 'A post with this slug already exists' },
                { status: 400 }
            );
        }

        const post = await prisma.blogPost.create({
            data: {
                title,
                content,
                slug,
                category: category || 'Uncategorized',
                tags: tags || '',
                coverImage,
                published: published || false,
                authorId: session.user.id,
            },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error('Error creating blog post:', error);
        return NextResponse.json(
            { error: 'Failed to create blog post' },
            { status: 500 }
        );
    }
}
