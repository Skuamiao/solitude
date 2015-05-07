<form action="/api/add-article" method="post">
    <div>
        <label for="title">标题：</label><input type="text" name="title"
                                            id="title" placeholder="这里是标题" />
    </div>
    <div>
        <label for="at">正文：</label><textarea name="at" id="at" cols="60"
                        rows="20" placeholder="这里是正文（markdown）"></textarea>
    </div>
    <div>
        <lable>状态：</label>
        <input id="draft" name="state" type="radio" value="0" checked /><label
                                                        for="draft">草稿</label>
        <input id="publication" name="state" type="radio" value="1" /><label
                                                for="publication">正文</label>
    </div>
    <div>
        <input type="submit" value="提交" /> <input type="reset" value="重填">
    </div>
    <input type="hidden" id="hide_1" name="hide_1" value="" />

</form>
