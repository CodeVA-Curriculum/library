# CodeVA Curriculum Library

This repository is the CodeVA Curriculum Library, containing metadata about all of CodeVA's curricular artifacts accessible via [https://curriculum.codevirginia.org](https://curriculum.codevirginia.org). This page contains information about the structure of the repository and information about contributing to the library.

## Library Structure

Here is an example of an Element with frontmatter:

```markdown
---
title: Data Science with Python
authors: Sara Fergus, Christa VanOlst, Jon Stapleton
subjects: Computer Science, Data & Analysis, Mathematics, Probability & Statistics
types: Lesson Plan, Unit of Study
_tags: python
links:
    drive: https://drive.google.com/drive/folders/14fex6O2nwfpnTowDUR-sgBs1WcqNsW6d
    pdf: https://drive.google.com/file/d/18JQIjVfhPzSO-jM9ST1wCE9fHypYpk0x/view?usp=drive_link
---

## Overview

This lesson sequence offers students and teachers a way to develop data science skills using the Python programming language through a mix of “plugged” and “unplugged” activities. View the materials on Google Drive or PDF by clicking the buttons above.

This material was created by Sara Fergus, Christa VanOlst, & Jon Stapleton for CodeVA with support from Capital One.
```

Elements can have the following metadata fields defined in frontmatter:

| Name | Type | Description | Required? | Inheritable? | Example |
| ---- | ---- | ----------- | --------- | ----------- | ------- |
| `title` | string | The name of the resource to be displayed prominently in its `ElementView` and `ElementCard` | ✅ | ❌ | `title: Data Science Project-Based Learning` |
| `links` | object | Links to the resource. Keys must be one of `goopen`, `pdf`, and/or `drive` (a required key). | ✅ | ❌ | See `data-science/python.md` |
| `authors` | comma-separated list | A list of the authors of the Element | ✅ | ✅ (default: CodeVA Curriculum) | `authors: Valerie Fawley, Jess Newsome` |
| `grades` | comma-separated list | A list of the grade levels associated with the Element. Use dash notation (.e.g, `3-5`) to denote a range of grade levels. | optional (default: K-12) | ✅ | `grades: K-2, 5, 7-12` |
| `subjects` | comma-separated list | A list of subjects and strands associated with the Element | optional (default: "Computer Science) | ✅ | `subjects: Mathematics, Computer Science, Algorithms & Programming` |
| `types` | comma-separated list | A list of the resource type categories the Element fits within | optional (default "Curricular Resource, Unit of Study, Lesson Plan") | ✅ | `types: Lesson Plan` |
| `standards` | comma-separated list | A list of the standards associated with the element | optional | ✅ | `standards: K.CS.AP.1, K.MT, K.CS.IC` |
| `tags` | comma-separated list | A list of tags associated with the element | optional | ✅ | `tags: computer science, integration, STEM` |
| `contents` | array | An array of strings pointing to Elements to be included on the Element page as members | optional | ✅ | See `data-science/meta.md` |

### Parents, Children, Groups, & Members

Elements have relationships to other Elements in the library--they can be "parents", "children", "groups", and "members". None of these categories are mutually exclusive--a single given Element can play all four of these roles.

- **Parent:** A "parent" element is expressed as a `meta.md` file, defining the metadata for a folder in the library. Each directory may only have one `meta.md` file
- **Child:** All Elements in the library are children of the `meta.md` beside it, or the `meta.md` file in its parent directory.
- **Group:** An Element that defines a `contents` field is a group, and the members listed there will be displayed on its page on the website
- **Member:** An Element that appears in the `contents` field of a group Element is a member of that group. Members do not inherit attributes from groups, but their groups will be displayed on their page on the website.

For example, given the library structure below:

```
.meta.md
data-science
    | codap.md
    | meta.md
    | python.md
    | unplugged.md
```

Each `.md` file is an Element. The Elements `codap.md`, `python.md`, and `unplugged.md` inherit attributes from `meta.md`, their parent Element. The `meta.md` Element likewise inherits attributes from its parent Element, `.meta.md`.

The `meta.md` Element is also a group, listing the following Elements in its `contents` field:

```
title: Data Science Project-Based Learning
contents:
    - ./unplugged.md
    - ./codap.md
    - ./python.md
```

Because the `meta.md` Element is a group, its members are listed on its page on the website:

![image](https://github.com/CodeVA-Curriculum/library/assets/25778579/54baa9f9-b3c3-4638-ad4a-116eaa4d92ef)


...and its members have a link back to its page in their header:

![image](https://github.com/CodeVA-Curriculum/library/assets/25778579/f1951b10-d00d-4994-b612-9509e0e69ddd)


### Aggregator Fields

If you want an Element to inherit an attribute from its parent and add additional items to the field, you can define an "aggregator field". Aggregator fields start with a `_` character. For example, the parent Element `meta.md` might define the following information in its metadata:

```
title: Data Science Project-Based Learning
authors: Sara Fergus, Christa VanOlst, Jon Stapleton
tags: data & analysis, data science
```

Its child Element, `python.md`, might define the following metadata:

```
title: Data Science with Python
_tags: python
```

Because `authors` is an inheritable field and `python.md` does not define its own `authors` field, `python.md` will inherit `Sara Fergus, Christ VanOlst, Jon Stapleton` as its `authors` value. Additionally, because `python.md` does not define its own `tags` field, it will inherit the tags from its parent. However, `python.md` *does* define a `_tags` aggregator field, meaning it will append "python" to the list of `tags` it inherited from its parent Element. 


## Contributing to the Library

To contribute to the library, follow the steps below:

1. Create a new branch with a descriptive name based on the content you plan to add (e.g., `alignment-guides`).
2. Add the `.md` files and folders to the repository from your branch.
3. Optional: run the `audit.js` program to make sure your contributions follow the correct formatting conventions
4. After you have finished making your contributions, make a pull request to trigger review. Once your branch is merged into the main branch, your contributions will be deployed to the main site.

To find the URL for the resource you want to make, use the resource's directory location in the repository, remove the `.md` file extension, and append it to the Library URL `https://curriculum.codevirginia.org/library/browse`. For example, if you added a  `new-lesson.md` file to the `k8-lessons` folder, the URL for that lesson plan would be `https://curriculum.codevirginia.org/library/browse/k8-lessons/new-lesson`.

### Errors & Requirements

If the auditor script finds errors in the library, it will throw an error:

```
Error: Found problems in the library. See errors.log for details
```

The auditor will create a file (`errors.log`) with information about the problems that must be corrected in order to upload the new library version to the Curriculum Library website.

### Markdown Details

The library supports several "directives", special Markdown elements that allow contributors to add additional detail or important styled features to Element pages.

<!-- TODO: 

#### `::nsf`

The `::nsf` directive allows contributors to insert the NSF disclaimer boilerplate language into the body of the Element along with the NSF logo as required by the terms of NSF grants. The `::nsf` directive has one required attribute, `number`, which should be set to the grant number associated with the Element. For example:

```
## Overview

The *Twine Trail Guide* is a website with resources, tutorials, and projects for novice programmers to use as they develop coding skills in Twine.

::nsf[123456]
```

If the directive does not define a number, the auditor script will throw an error:

```
Error: File {filename} uses the ::nsf directive, but does not define a number!
``` -->

#### `::supporter`

The `::supporter` directive is a catch-all element that allows contributors to create a callout box like the `::nsf` disclaimer crediting another organization. It takes one child, the name of the supporter organization, and a `src` attribute pointing to the logo image for the organization (which should be added to `static/images`).

```
::supporter[the Kapor Center]{src="logo.png"}
```

The name of the organization will be inserted into the following template:

> This material was created with support from [organization name]. Any opinions, findings, and conclusions or recommendations expressed in this material are those of the author(s) and do not necessarily reflect the views of [organization name].

Be sure to add an article to the name if it needs one to make sense in the template (e.g., "the Kapor Center" needs "the" in order to make sense, while "Capital One" does not require it).


### Field Details (Work in Progress)

Below, you'll find special-case information for each of the Element frontmatter fields.

### `title`

| Name | Type | Description | Required? | Inheritable? | Example |
| ---- | ---- | ----------- | --------- | ----------- | ------- |
| `title` | string | The name of the resource to be displayed prominently in its `ElementView` and `ElementCard` | ✅ | ❌ | `title: Data Science Project-Based Learning` |

**Notation:** If the title needs to include a `:`, enclose the title in single or double-quotes to avoid a parsing error: `title: "CS for CTE: Endorsement, Expertise, Empowerment"`

If an Element fails to define a valid title, the auditor script will throw an error:

```
Error: File {filename} fails to define a valid title!
```

### `authors`

| Name | Type | Description | Required? | Inheritable? | Example |
| ---- | ---- | ----------- | --------- | ----------- | ------- |
| `authors` | comma-separated list | A list of the authors of the Element | ✅ | ✅ (default: CodeVA Curriculum) | `authors: Valerie Fawley, Jess Newsome` |

If an Element fails to define a valid `authors` value, the auditor script will throw an error:

```
Error: File {filename} fails to define a valid authors list!
```

### `standards`

| Name | Type | Description | Required? | Inheritable? | Example |
| ---- | ---- | ----------- | --------- | ------------ | ------- |
| `standards` | comma-separated list | A list of the standards associated with the element | optional | ✅ | `standards: K.CS.AP.1, K.MT, K.CS.IC` |

**Notation:** Use "standard IDs" to reference standards. The ID structure is `[grade].[subject].[strand].[number]`, with each component separated by a `.`. All four of these ID components are required unless you want to reference a range of standards (see below). You can find the list of allowed grade, subject, and strand abbreviations here: https://github.com/CodeVA-Curriculum/index/blob/main/src/routes/api/standards/id_key.yaml. If a specified standard does not exist in the [library standards data](https://github.com/CodeVA-Curriculum/index/tree/main/src/routes/api/standards) (often because it uses an incorrect ID component), the auditor script will throw an error:

```
Error: {filename} references a standard ({standard ID}) that does not exist!
```

**Standard Ranges:** Use dash notation to denote a range of grades. Omit strand or number ID to include all standards in subject or strand. For example, `K-2.CS` selects all CS standards K-2, or `8.CS.AP` selects all grade 8 CS Algorithms & Programming standards
