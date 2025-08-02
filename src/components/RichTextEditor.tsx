'use client';

import { Color } from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { TextStyle } from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Undo,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = 'Start writing...',
  className = '',
}: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4',
      },
    },
  });

  const addImage = useCallback(() => {
    const url = window.prompt('Enter image URL:');
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('Enter URL:', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor
      ?.chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run();
  }, [editor]);

  if (!isMounted || !editor) {
    return (
      <div className={`border rounded-lg ${className}`}>
        <div className='border-b p-2 h-10 bg-muted animate-pulse' />
        <div className='min-h-[200px] p-4 bg-muted/20 animate-pulse' />
      </div>
    );
  }

  return (
    <div className={`border rounded-lg ${className}`}>
      {/* Toolbar */}
      <div className='border-b p-2 flex flex-wrap gap-1'>
        <Button
          variant={editor.isActive('bold') ? 'default' : 'ghost'}
          size='sm'
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className='h-4 w-4' />
        </Button>

        <Button
          variant={editor.isActive('italic') ? 'default' : 'ghost'}
          size='sm'
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className='h-4 w-4' />
        </Button>

        <Button
          variant={editor.isActive('strike') ? 'default' : 'ghost'}
          size='sm'
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className='h-4 w-4' />
        </Button>

        <Button
          variant={
            editor.isActive('heading', { level: 1 }) ? 'default' : 'ghost'
          }
          size='sm'
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <Heading1 className='h-4 w-4' />
        </Button>

        <Button
          variant={
            editor.isActive('heading', { level: 2 }) ? 'default' : 'ghost'
          }
          size='sm'
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 className='h-4 w-4' />
        </Button>

        <Button
          variant={
            editor.isActive('heading', { level: 3 }) ? 'default' : 'ghost'
          }
          size='sm'
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading3 className='h-4 w-4' />
        </Button>

        <Button
          variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
          size='sm'
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className='h-4 w-4' />
        </Button>

        <Button
          variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
          size='sm'
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className='h-4 w-4' />
        </Button>

        <Button
          variant={editor.isActive('blockquote') ? 'default' : 'ghost'}
          size='sm'
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote className='h-4 w-4' />
        </Button>

        <Button
          variant={editor.isActive('code') ? 'default' : 'ghost'}
          size='sm'
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <Code className='h-4 w-4' />
        </Button>

        <div className='w-px h-6 bg-border mx-1' />

        <Button variant='ghost' size='sm' onClick={addLink}>
          <LinkIcon className='h-4 w-4' />
        </Button>

        <Button variant='ghost' size='sm' onClick={addImage}>
          <ImageIcon className='h-4 w-4' />
        </Button>

        <div className='w-px h-6 bg-border mx-1' />

        <Button
          variant='ghost'
          size='sm'
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo className='h-4 w-4' />
        </Button>

        <Button
          variant='ghost'
          size='sm'
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Redo className='h-4 w-4' />
        </Button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className='min-h-[200px]' />
    </div>
  );
}
