import BlogEditor from '@/components/Admin/BlogEditor';
import AdminLayout from '@/components/Admin/AdminLayout';

export default function NewBlogPostPage() {
    return (
        <AdminLayout>
            <BlogEditor />
        </AdminLayout>
    );
}
