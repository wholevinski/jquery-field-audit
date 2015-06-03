Field auditor that will track changes made to inputs on a form. The changes will then be POSTed as JSON.

Options:

    "formName" - REQUIRED - jquery form selector - Form that has inputs to track in it; will also be where the tracking inputs will be appended
    "inputSelector" - DEFAULT: "input[type='text'], input[type='checkbox'], input[type='radio'], select, textarea" - Selector to determine what types of inputs to track A
    "changesName" - DEFAULT: "changes[]" - This is what the input(s) will be named that track changes; it is what the changes will be POSTed as

Most (if not all) backends support JSON. To get the changes that were made, you can do something like (django and python example):

    import json
    changes_jsons = request.POST.getlist('changes[]', [])
    changes_dicts = (json.loads(changes_json) for changes_json in changes_jsons)
