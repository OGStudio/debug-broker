
function DEBUG_PAGE_ITEM_LOG(message)
{
    console.log(`DebugPageItem ${message}`);
}

module.exports =
class DebugPageItem
{
    constructor(title, value, isWritable)
    {
        this.title = title;
        this.value = value
        this.isWritable = isWritable;
    }

}

