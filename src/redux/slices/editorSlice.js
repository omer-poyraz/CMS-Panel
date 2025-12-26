import { createSlice } from '@reduxjs/toolkit';

const MAX_HISTORY = 50;

const editorSlice = createSlice({
    name: 'editor',
    initialState: {
        isVideoModalOpen: false,
        isVideoLinkModalOpen: false,
        videoCommand: null,
        content: '',
        isCodeView: false,
        history: [''],
        historyIndex: 0,
        lastSaveTime: Date.now(),
        selectedText: {
            bold: false,
            italic: false,
            underline: false,
            strikethrough: false,
        },
        removeFormatting: false,
        formatCommand: null,
        fontSizeCommand: null,
        textTransformCommand: null,
        fontFamilyCommand: null,
        paragraphStyleCommand: null,
        isLinkModalOpen: false,
        linkCommand: null,
        fontColorCommand: null,
        fontBackgroundColorCommand: null,
        wordCount: 0,
        charCount: 0,
        selectedFontColor: '#000000',
        selectedFontBackgroundColor: '#ffff00',
        bookmarkCommand: null,
        isBookmarkModalOpen: false,
        bookmarkName: '',
        isImageModalOpen: false,
        isImageLinkModalOpen: false,
        imageCommand: null,
        isTableModalOpen: false,
        tableCommand: null,
        horizontalRuleCommand: null,
        isQuoteModalOpen: false,
        quoteCommand: null,
        solidHorizontalRuleCommand: null,
        textAlignCommand: null,
        lineHeightCommand: null,
        listCommand: null,
        checkListCommand: null,
        emojiCommand: null,
        specialCharCommand: null,
        isFindReplaceOpen: false,
        findReplaceCommand: null,
        isWordImportOpen: false,
        wordImportCommand: null,
        exportWordCommand: null,
        exportPdfCommand: null,
    },
    reducers: {
        setLineHeight: (state, action) => {
            state.lineHeightCommand = action.payload;
        },
        clearLineHeightCommand: (state) => {
            state.lineHeightCommand = null;
        },
        applyFontBackgroundColor: (state, action) => {
            state.fontBackgroundColorCommand = action.payload;
        },
        clearFontBackgroundColorCommand: (state) => {
            state.fontBackgroundColorCommand = null;
        },
        setSelectedFontBackgroundColor: (state, action) => {
            state.selectedFontBackgroundColor = action.payload;
        },
        applyTextAlign(state, action) {
            state.textAlignCommand = action.payload;
        },
        clearTextAlignCommand(state) {
            state.textAlignCommand = null;
        },
        applySolidHorizontalRule(state) {
            state.solidHorizontalRuleCommand = {};
        },
        clearSolidHorizontalRuleCommand(state) {
            state.solidHorizontalRuleCommand = null;
        },
        openVideoModal: (state) => {
            state.isVideoModalOpen = true;
        },
        closeVideoModal: (state) => {
            state.isVideoModalOpen = false;
        },
        openVideoLinkModal: (state) => {
            state.isVideoLinkModalOpen = true;
        },
        closeVideoLinkModal: (state) => {
            state.isVideoLinkModalOpen = false;
        },
        applyVideo: (state, action) => {
            state.videoCommand = action.payload;
            state.isVideoModalOpen = false;
            state.isVideoLinkModalOpen = false;
        },
        clearVideoCommand: (state) => {
            state.videoCommand = null;
        },
        openImageModal: (state) => {
            state.isImageModalOpen = true;
        },
        closeImageModal: (state) => {
            state.isImageModalOpen = false;
        },
        openImageLinkModal: (state) => {
            state.isImageLinkModalOpen = true;
        },
        closeImageLinkModal: (state) => {
            state.isImageLinkModalOpen = false;
        },
        applyImage: (state, action) => {
            state.imageCommand = action.payload;
            state.isImageModalOpen = false;
            state.isImageLinkModalOpen = false;
        },
        clearImageCommand: (state) => {
            state.imageCommand = null;
        },
        openTableModal(state) {
            state.isTableModalOpen = true;
        },
        closeTableModal(state) {
            state.isTableModalOpen = false;
        },
        applyTable(state, action) {
            state.tableCommand = action.payload;
            state.isTableModalOpen = false;
        },
        clearTableCommand(state) {
            state.tableCommand = null;
        },
        applyHorizontalRule(state) {
            state.horizontalRuleCommand = {};
        },
        clearHorizontalRuleCommand(state) {
            state.horizontalRuleCommand = null;
        },
        setContent: (state, action) => {
            const newContent = action.payload;
            const now = Date.now();

            if (state.history[state.historyIndex] === newContent) {
                return;
            }
            if (now - state.lastSaveTime < 500) {
                state.history[state.historyIndex] = newContent;
            } else {
                if (state.historyIndex < state.history.length - 1) {
                    state.history = state.history.slice(0, state.historyIndex + 1);
                }
                state.history.push(newContent);
                state.historyIndex = state.history.length - 1;
                if (state.history.length > MAX_HISTORY) {
                    state.history.shift();
                    state.historyIndex--;
                }
            }

            state.content = newContent;
            const text = newContent.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
            state.wordCount = text.length > 0 ? text.split(' ').length : 0;
            state.charCount = text.replace(/\s/g, '').length;
            state.lastSaveTime = now;
        },
        undo: (state) => {
            if (state.historyIndex > 0) {
                state.historyIndex--;
                state.content = state.history[state.historyIndex];
            }
        },
        redo: (state) => {
            if (state.historyIndex < state.history.length - 1) {
                state.historyIndex++;
                state.content = state.history[state.historyIndex];
            }
        },
        toggleCodeView: (state) => {
            state.isCodeView = !state.isCodeView;
        },
        applyFormatting: (state, action) => {
            const { format } = action.payload;
            state.formatCommand = format;
        },
        openBookmarkModal: (state) => {
            state.isBookmarkModalOpen = true;
        },
        closeBookmarkModal: (state) => {
            state.isBookmarkModalOpen = false;
            state.bookmarkName = '';
        },
        setBookmarkName: (state, action) => {
            state.bookmarkName = action.payload;
        },
        applyBookmark: (state, action) => {
            state.bookmarkCommand = { name: action.payload?.name || state.bookmarkName };
            state.isBookmarkModalOpen = false;
            state.bookmarkName = '';
        },
        clearBookmarkCommand: (state) => {
            state.bookmarkCommand = null;
        },
        clearFormatCommand: (state) => {
            state.formatCommand = null;
        },
        applyFontSize: (state, action) => {
            state.fontSizeCommand = action.payload;
        },
        clearFontSizeCommand: (state) => {
            state.fontSizeCommand = null;
        },
        applyTextTransform: (state, action) => {
            state.textTransformCommand = action.payload;
        },
        clearTextTransformCommand: (state) => {
            state.textTransformCommand = null;
        },
        applyFontFamily: (state, action) => {
            state.fontFamilyCommand = action.payload;
        },
        clearFontFamilyCommand: (state) => {
            state.fontFamilyCommand = null;
        },
        applyParagraphStyle: (state, action) => {
            state.paragraphStyleCommand = action.payload;
        },
        clearParagraphStyleCommand: (state) => {
            state.paragraphStyleCommand = null;
        },
        openLinkModal: (state) => {
            state.isLinkModalOpen = true;
        },
        closeLinkModal: (state) => {
            state.isLinkModalOpen = false;
        },
        applyLink: (state, action) => {
            state.linkCommand = action.payload;
            state.isLinkModalOpen = false;
        },
        clearLinkCommand: (state) => {
            state.linkCommand = null;
        },
        applyFontColor: (state, action) => {
            state.fontColorCommand = action.payload;
        },
        clearFontColorCommand: (state) => {
            state.fontColorCommand = null;
        },
        setSelectedFontColor: (state, action) => {
            state.selectedFontColor = action.payload;
        },
        setSelectedFormatting: (state, action) => {
            const { bold, italic, underline, strikethrough } = action.payload;
            state.selectedText.bold = !!bold;
            state.selectedText.italic = !!italic;
            state.selectedText.underline = !!underline;
            state.selectedText.strikethrough = !!strikethrough;
        },
        clearFormatting: (state) => {
            state.selectedText = {
                bold: false,
                italic: false,
                underline: false,
                strikethrough: false,
            };
        },
        triggerRemoveFormatting: (state) => {
            state.removeFormatting = true;
        },
        clearRemoveFormatting: (state) => {
            state.removeFormatting = false;
        },
        openQuoteModal(state) {
            state.isQuoteModalOpen = true;
        },
        closeQuoteModal(state) {
            state.isQuoteModalOpen = false;
        },
        applyQuote(state, action) {
            state.quoteCommand = action.payload;
            state.isQuoteModalOpen = false;
        },
        clearQuoteCommand(state) {
            state.quoteCommand = null;
        },
        applyList(state, action) {
            state.listCommand = action.payload;
        },
        clearListCommand(state) {
            state.listCommand = null;
        },
        applyCheckList(state) {
            state.checkListCommand = {};
        },
        clearCheckListCommand(state) {
            state.checkListCommand = null;
        },
        applyEmoji(state, action) {
            state.emojiCommand = action.payload;
        },
        clearEmojiCommand(state) {
            state.emojiCommand = null;
        },
        applySpecialChar(state, action) {
            state.specialCharCommand = action.payload;
        },
        clearSpecialCharCommand(state) {
            state.specialCharCommand = null;
        },
        openFindReplace(state) {
            state.isFindReplaceOpen = true;
        },
        closeFindReplace(state) {
            state.isFindReplaceOpen = false;
        },
        applyFindReplace(state, action) {
            state.findReplaceCommand = action.payload;
            state.isFindReplaceOpen = false;
        },
        clearFindReplaceCommand(state) {
            state.findReplaceCommand = null;
        },
        openWordImport(state) {
            state.isWordImportOpen = true;
        },
        closeWordImport(state) {
            state.isWordImportOpen = false;
        },
        applyWordImport(state, action) {
            state.wordImportCommand = action.payload;
            state.isWordImportOpen = false;
        },
        clearWordImportCommand(state) {
            state.wordImportCommand = null;
        },
        exportWord(state) {
            state.exportWordCommand = {};
        },
        clearExportWordCommand(state) {
            state.exportWordCommand = null;
        },
        exportPdf(state) {
            state.exportPdfCommand = {};
        },
        clearExportPdfCommand(state) {
            state.exportPdfCommand = null;
        },
    },
});

export const { openQuoteModal, closeQuoteModal, applyQuote, clearQuoteCommand, applyHorizontalRule, clearHorizontalRuleCommand, applySolidHorizontalRule, clearSolidHorizontalRuleCommand, applyTextAlign, clearTextAlignCommand, setLineHeight, clearLineHeightCommand, setContent, undo, redo, toggleCodeView, applyFormatting, setSelectedFormatting, clearFormatting, triggerRemoveFormatting, clearRemoveFormatting, clearFormatCommand, applyFontSize, clearFontSizeCommand, applyTextTransform, clearTextTransformCommand, applyFontFamily, clearFontFamilyCommand, applyParagraphStyle, clearParagraphStyleCommand, openLinkModal, closeLinkModal, applyLink, clearLinkCommand, applyFontColor, setSelectedFontColor, clearFontColorCommand, applyFontBackgroundColor, clearFontBackgroundColorCommand, setSelectedFontBackgroundColor, applyBookmark, clearBookmarkCommand, openBookmarkModal, closeBookmarkModal, setBookmarkName, openImageModal, closeImageModal, openImageLinkModal, closeImageLinkModal, applyImage, clearImageCommand, openVideoModal, openVideoLinkModal, applyVideo, closeVideoModal, closeVideoLinkModal, openTableModal, closeTableModal, applyTable, clearTableCommand, applyList, clearListCommand, applyCheckList, clearCheckListCommand, applyEmoji, clearEmojiCommand, applySpecialChar, clearSpecialCharCommand, openFindReplace, closeFindReplace, applyFindReplace, clearFindReplaceCommand, openWordImport, closeWordImport, applyWordImport, clearWordImportCommand, exportWord, clearExportWordCommand, exportPdf, clearExportPdfCommand } = editorSlice.actions;
export default editorSlice.reducer