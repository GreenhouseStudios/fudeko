<template>
    <div>
        <section id="button-menu" v-if="editor" class="flex items-center justify-center gap-2 p-1 bg-yellow-100">
            <button class="p-1 bg-yellow-300 rounded-sm hover:bg-yellow-400"
                @click="editor.chain().focus().toggleBold().run()"
                :disabled="!editor.can().chain().focus().toggleBold().run()"
                :class="{ 'bg-yellow-100 border-2 border-black font-bold': editor.isActive('bold') }">
                <v-icon name="bold" />
            </button>
            <button class="p-1 bg-yellow-300 rounded-sm hover:bg-yellow-400"
                @click="editor.chain().focus().toggleItalic().run()"
                :disabled="!editor.can().chain().focus().toggleItalic().run()"
                :class="{ 'bg-yellow-100 border-2 border-black font-bold': editor.isActive('italic') }">
                <v-icon name="italic"></v-icon>
            </button>
            <button class="p-1 bg-yellow-300 rounded-sm hover:bg-yellow-400"
                @click="editor.chain().focus().toggleStrike().run()"
                :disabled="!editor.can().chain().focus().toggleStrike().run()"
                :class="{ 'bg-yellow-100 border-2 border-black font-bold': editor.isActive('strike') }">
                <v-icon name="strikethrough"></v-icon>
            </button>
            <!-- <button @click="editor.chain().focus().toggleCode().run()"
                :disabled="!editor.can().chain().focus().toggleCode().run()"
                :class="{ 'is-active': editor.isActive('code') }">
                code
            </button> -->
            <button class="p-1 bg-yellow-300 rounded-sm hover:bg-yellow-400"
                @click="editor.chain().focus().unsetAllMarks().run()">
                Clear Marks
            </button>
            <!-- <button @click="editor.chain().focus().clearNodes().run()">
                clear nodes
            </button> -->
            <!-- <button @click="editor.chain().focus().setParagraph().run()"
                :class="{ 'is-active': editor.isActive('paragraph') }">
                paragraph
            </button> -->
            <!-- <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                h1
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                h2
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
                h3
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
                h4
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
                h5
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
                h6
            </button> -->
            <!-- <button @click="editor.chain().focus().toggleBulletList().run()"
                :class="{ 'is-active': editor.isActive('bulletList') }">
                bullet list
            </button>
            <button @click="editor.chain().focus().toggleOrderedList().run()"
                :class="{ 'is-active': editor.isActive('orderedList') }">
                ordered list
            </button>
            <button @click="editor.chain().focus().toggleCodeBlock().run()"
                :class="{ 'is-active': editor.isActive('codeBlock') }">
                code block
            </button>
            <button @click="editor.chain().focus().toggleBlockquote().run()"
                :class="{ 'is-active': editor.isActive('blockquote') }">
                blockquote
            </button> -->
            <button class="p-1 bg-yellow-300 rounded-sm hover:bg-yellow-400"
                @click="editor.chain().focus().setHorizontalRule().run()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hr"
                    viewBox="0 0 16 16">
                    <path
                        d="M12 3H4a1 1 0 0 0-1 1v2.5H2V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2.5h-1V4a1 1 0 0 0-1-1zM2 9.5h1V12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9.5h1V12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5zm-1.5-2a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1H.5z" />
                </svg>
            </button>
            <!-- <button @click="editor.chain().focus().setHardBreak().run()">
                hard break
            </button> -->
            <button class="p-1 bg-yellow-300 rounded-sm hover:bg-yellow-400" @click="editor.chain().focus().undo().run()"
                :disabled="!editor.can().chain().focus().undo().run()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z" />
                </svg>
            </button>
            <button class="p-1 bg-yellow-300 rounded-sm hover:bg-yellow-400" @click="editor.chain().focus().redo().run()"
                :disabled="!editor.can().chain().focus().redo().run()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-arrow-90deg-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M14.854 4.854a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 4H3.5A2.5 2.5 0 0 0 1 6.5v8a.5.5 0 0 0 1 0v-8A1.5 1.5 0 0 1 3.5 5h9.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4z" />
                </svg>
            </button>

        </section>
        <editor-content :editor="editor" />
    </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'

export default {
    components: {
        EditorContent,
    },
    props: {
        value: {
            type: String,
            default: "Hello world"
        },
    },
    data() {
        return {
            editor: null,
        }
    },

    mounted() {
        this.editor = new Editor( {
            editorProps: {
                attributes: {
                    class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none border-gray-200 border-2 min-h-[12rem] overflow-y-auto p-3 min-h-[200px]',
                },
            },
            content: this.value,
            onUpdate: () => {
                // HTML
                this.$emit( 'input', this.editor.getHTML() )

                // JSON
                // this.$emit('input', this.editor.getJSON())
            },
            extensions: [
                StarterKit,
            ],
        } )
    },

    watch: {
        value( value ) {
            // HTML
            const isSame = this.editor.getHTML() === value

            // JSON
            // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

            if ( isSame ) {
                return
            }

            this.editor.commands.setContent( value, false )
        },
    },

    beforeDestroy() {
        this.editor.destroy()
    },
}
</script>

<style lang="scss">
/* Basic editor styles */
.tiptap {
    >*+* {
        margin-top: 0.75em;
    }

    ul,
    ol {
        padding: 0 1rem;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        line-height: 1.1;
    }

    code {
        background-color: rgba(#616161, 0.1);
        color: #616161;
    }

    pre {
        background: #0D0D0D;
        color: #FFF;
        font-family: 'JetBrainsMono', monospace;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;

        code {
            color: inherit;
            padding: 0;
            background: none;
            font-size: 0.8rem;
        }
    }

    img {
        max-width: 100%;
        height: auto;
    }

    blockquote {
        padding-left: 1rem;
        border-left: 2px solid rgba(#0D0D0D, 0.1);
    }

    hr {
        border: none;
        border-top: 2px solid rgba(#0D0D0D, 0.1);
        margin: 2rem 0;
    }
}</style>